PHONY: production deploy_preview

production:
	jekyll build

deploy_preview:
	jekyll build --future && cp netlify_headers _site/_headers
