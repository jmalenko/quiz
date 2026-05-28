#!/usr/bin/env bash
# Health Check — Quiz Application
# Process 12 Operation
#
# Checks that the deployed system is responding correctly.
# Suitable for scheduled execution (cron) or manual on-demand use.
#
# Exit code 0 = system healthy
# Exit code 1 = one or more checks failed
#
# Usage:
#   bash health-check.sh
#   BASE_URL=http://myhost:8888 bash health-check.sh
#
# Note: designed for Linux hosts and Linux CI.
# On Windows with Docker Desktop + WSL 2, run from Windows (Git Bash / PowerShell curl)
# or set BASE_URL to the Windows host IP reachable from WSL.

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:8888}"
TIMESTAMP=$(date -u '+%Y-%m-%d %H:%M:%S UTC')
PASS=0
FAIL=0

check() {
  local description="$1"
  local result="$2"
  if [ "$result" = "pass" ]; then
    echo "  ✅ PASS — $description"
    ((PASS++)) || true
  else
    echo "  ❌ FAIL — $description"
    ((FAIL++)) || true
  fi
}

echo ""
echo "[$TIMESTAMP] Health Check — Quiz Application"
echo "Target: $BASE_URL"
echo "──────────────────────────────────────────"

# Check 1 — Frontend reachable
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" --max-time 5 "$BASE_URL" || echo "000")
[ "$HTTP_STATUS" = "200" ] && check "Frontend reachable (HTTP $HTTP_STATUS)" "pass" \
                            || check "Frontend reachable (HTTP $HTTP_STATUS, expected 200)" "fail"

# Check 2 — Backend reachable via nginx proxy
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" --max-time 5 "$BASE_URL/api/questions" || echo "000")
[ "$HTTP_STATUS" = "200" ] && check "Backend API reachable (HTTP $HTTP_STATUS)" "pass" \
                            || check "Backend API reachable (HTTP $HTTP_STATUS, expected 200)" "fail"

# Check 3 — At least one question returned
RESPONSE=$(curl -s --max-time 5 "$BASE_URL/api/questions" 2>/dev/null || echo "[]")
QUESTION_COUNT=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d))" 2>/dev/null || echo "0")
[ "$QUESTION_COUNT" -gt "0" ] \
  && check "Questions available ($QUESTION_COUNT returned)" "pass" \
  || check "Questions available (none returned)" "fail"

echo "──────────────────────────────────────────"
echo "Result: $PASS passed, $FAIL failed"
echo ""

if [ "$FAIL" -gt "0" ]; then
  echo "⚠️  System is NOT healthy — review incidents in OPERATION_DETAILED.md"
  exit 1
fi

echo "✅ System is healthy"
exit 0
