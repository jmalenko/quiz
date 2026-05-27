#!/usr/bin/env bash
# Smoke Test — Quiz Application
# Process 10 Transition
# Runs against the deployed system on http://localhost:8888
# Exit code 0 = all checks pass; non-zero = at least one check failed

set -euo pipefail

BASE_URL="${SMOKE_TEST_BASE_URL:-http://localhost:8888}"
PASS=0
FAIL=0

check() {
  local description="$1"
  local result="$2"   # "pass" or "fail"
  if [ "$result" = "pass" ]; then
    echo "  ✅ PASS — $description"
    ((PASS++)) || true
  else
    echo "  ❌ FAIL — $description"
    ((FAIL++)) || true
  fi
}

echo ""
echo "Smoke Test — Quiz Application"
echo "Target: $BASE_URL"
echo "──────────────────────────────────────────"

# Check 1 — Frontend reachable
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$BASE_URL")
if [ "$HTTP_STATUS" = "200" ]; then
  check "Frontend reachable (HTTP $HTTP_STATUS)" "pass"
else
  check "Frontend reachable (HTTP $HTTP_STATUS, expected 200)" "fail"
fi

# Check 2 — Backend reachable via nginx proxy
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$BASE_URL/api/questions")
if [ "$HTTP_STATUS" = "200" ]; then
  check "Backend reachable via proxy (HTTP $HTTP_STATUS)" "pass"
else
  check "Backend reachable via proxy (HTTP $HTTP_STATUS, expected 200)" "fail"
fi

# Check 3 — At least one question returned
RESPONSE=$(curl -s "$BASE_URL/api/questions")
QUESTION_COUNT=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d))" 2>/dev/null || echo "0")
if [ "$QUESTION_COUNT" -gt "0" ]; then
  check "Questions returned ($QUESTION_COUNT question(s))" "pass"
else
  check "Questions returned (response: $RESPONSE)" "fail"
fi

echo "──────────────────────────────────────────"
echo "Result: $PASS passed, $FAIL failed"
echo ""

if [ "$FAIL" -gt "0" ]; then
  exit 1
fi
exit 0
