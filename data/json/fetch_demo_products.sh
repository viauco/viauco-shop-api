# This command requires "jq" -> https://stedolan.github.io/jq/
if ! [ -x "$(command -v jq)" ]; then
  echo 'Error: jq is not installed. Please download it from https://stedolan.github.io/jq/' >&2
  exit 1
fi

curl -sS  "https://demo.storefrontcloud.io/api/catalog/vue_storefront_catalog/product/_search?size=50&from=0&sort=updated_at%3Adesc&request=%7B%22query%22%3A%7B%22bool%22%3A%7B%22filter%22%3A%7B%22bool%22%3A%7B%22must%22%3A%5B%7B%22terms%22%3A%7B%22visibility%22%3A%5B2%2C3%2C4%5D%7D%7D%2C%7B%22terms%22%3A%7B%22status%22%3A%5B0%2C1%5D%7D%7D%2C%7B%22terms%22%3A%7B%22stock.is_in_stock%22%3A%5Btrue%5D%7D%7D%2C%7B%22terms%22%3A%7B%22category_ids%22%3A%5B20%2C21%2C23%2C24%2C25%2C26%2C22%2C27%2C28%5D%7D%7D%5D%7D%7D%7D%7D%2C%22aggs%22%3A%7B%22agg_terms_color%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22color%22%2C%22size%22%3A10%7D%7D%2C%22agg_terms_color_options%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22color_options%22%2C%22size%22%3A10%7D%7D%2C%22agg_terms_size%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22size%22%2C%22size%22%3A10%7D%7D%2C%22agg_terms_size_options%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22size_options%22%2C%22size%22%3A10%7D%7D%2C%22agg_terms_price%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22price%22%7D%7D%2C%22agg_range_price%22%3A%7B%22range%22%3A%7B%22field%22%3A%22price%22%2C%22ranges%22%3A%5B%7B%22from%22%3A0%2C%22to%22%3A50%7D%2C%7B%22from%22%3A50%2C%22to%22%3A100%7D%2C%7B%22from%22%3A100%2C%22to%22%3A150%7D%2C%7B%22from%22%3A150%7D%5D%7D%7D%2C%22agg_terms_erin_recommends%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22erin_recommends%22%2C%22size%22%3A10%7D%7D%2C%22agg_terms_erin_recommends_options%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22erin_recommends_options%22%2C%22size%22%3A10%7D%7D%7D%7D" | jq ".hits.hits[]._source | { id, name, image, sku, url_key, type_id, price, special_price, priceInclTax, specialPriceInclTax, special_to_date, special_from_date, name, status, size, color, size_options, color_options, category_ids, media_gallery, configurable_children: [ .configurable_children[] | { type_id, sku, special_price, special_to_date, special_from_date, name, price, priceInclTax, specialPriceInclTax, id, image, url_key, status, size, color } ] }" | jq -s -M \ > products.json

echo "Products dumped into 'products.json'"