#!/bin/bash

# Claude Auto-Post Cron Job Setup Script
# This script sets up a daily cron job to automatically generate and publish blog posts

BLOG_DIR="/Users/ted/WebstormProjects/blog"
LOG_DIR="$BLOG_DIR/logs"
CRON_LOG="$LOG_DIR/cron.log"

# Node.js 경로 찾기
NODE_PATH=$(which node)
NPM_PATH=$(which npm)

echo "=== Claude Auto-Post Cron Job Setup ==="
echo "Blog directory: $BLOG_DIR"
echo "Node path: $NODE_PATH"
echo "NPM path: $NPM_PATH"
echo "Log file: $CRON_LOG"
echo ""

# 로그 디렉토리 생성
mkdir -p "$LOG_DIR"

# 크론잡 명령어 생성
CRON_CMD="0 9 * * * cd $BLOG_DIR && $NPM_PATH run auto-post >> $CRON_LOG 2>&1"

echo "Cron job command:"
echo "$CRON_CMD"
echo ""

# 현재 crontab 확인
echo "Current crontab:"
crontab -l 2>/dev/null || echo "(no crontab configured)"
echo ""

# 이미 설정되어 있는지 확인
if crontab -l 2>/dev/null | grep -q "auto-post"; then
    echo "⚠️  Auto-post cron job already exists!"
    echo ""
    read -p "Do you want to replace it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
    # 기존 auto-post 크론잡 제거
    crontab -l 2>/dev/null | grep -v "auto-post" | crontab -
fi

# 새 크론잡 추가
(crontab -l 2>/dev/null; echo "$CRON_CMD") | crontab -

echo "✅ Cron job added successfully!"
echo ""
echo "The auto-post script will run daily at 9:00 AM."
echo "Logs will be saved to: $CRON_LOG"
echo ""
echo "To view the crontab:"
echo "  crontab -l"
echo ""
echo "To view logs:"
echo "  tail -f $CRON_LOG"
echo ""
echo "To remove the cron job:"
echo "  crontab -e"
echo "  (then delete the line containing 'auto-post')"
