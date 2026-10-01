MCP_PID_DIR := /tmp/mcp-servers

dev-tina: ## Start TinaCMS dev server
	@echo "Starting TinaCMS..."
	npm run dev

dev-mcp-start: ## Start all MCP servers (context7, dart, graphql, mobile)
	@mkdir -p $(MCP_PID_DIR)
	@echo "Starting MCP servers..."
	@if [ -f $(MCP_PID_DIR)/context7.pid ] && kill -0 $$(cat $(MCP_PID_DIR)/context7.pid) 2>/dev/null; then \
		echo "context7 already running (PID: $$(cat $(MCP_PID_DIR)/context7.pid))"; \
	else \
		CONTEXT7_API_KEY=$$(jq -r '.mcp.context7.headers.CONTEXT7_API_KEY' .opencode.json) \
			npx -y @upstash/context7-mcp & echo $$! > $(MCP_PID_DIR)/context7.pid; \
		echo "context7 started"; \
	fi
