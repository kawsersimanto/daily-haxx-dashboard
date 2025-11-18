#!/bin/bash

# Usage examples:
# ./delete-feature.sh medicine-brand              -> deletes entire feature folder
# ./delete-feature.sh medicine-brand schema       -> deletes only schema file
# ./delete-feature.sh medicine-brand interface    -> deletes only interface file
# ./delete-feature.sh medicine-brand slice        -> deletes only slice file
# ./delete-feature.sh medicine-brand api          -> deletes only api file
# ./delete-feature.sh medicine-brand hooks        -> deletes hooks folder
# ./delete-feature.sh medicine-brand components   -> deletes components folder
# ./delete-feature.sh medicine-brand constants    -> deletes constants file

if [ $# -lt 1 ]; then
  echo "Please provide a feature name."
  exit 1
fi

feature_kebab=$(echo "$1" | tr '[:upper:]' '[:lower:]')                  # e.g. medicine-brand
feature_pascal=$(echo "$feature_kebab" | sed -E 's/(^|-)([a-z])/\U\2/g') # MedicineBrand
feature_camel=$(echo "$feature_kebab" | sed -E 's/-([a-z])/\U\1/g')      # medicineBrand

base="src/features/$feature_kebab"
STORE_FILE="src/redux/store.ts"
BASE_API_FILE="src/redux/api/baseApi.ts"

# --- Helper functions ---
delete_file() {
  if [ -f "$1" ]; then
    rm "$1"
    echo "🗑️  Deleted file: $1"
  else
    echo "⚠️  File not found: $1"
  fi
}

delete_folder() {
  if [ -d "$1" ]; then
    rm -rf "$1"
    echo "🗑️  Deleted folder: $1"
  else
    echo "⚠️  Folder not found: $1"
  fi
}

# --- Main deletion logic ---
if [ $# -eq 1 ]; then
  delete_folder "$base"
  echo "✅ Entire feature '$feature_kebab' deleted."
else
  case $2 in
    schema) delete_file "$base/${feature_kebab}.schema.ts" ;;
    interface) delete_file "$base/${feature_kebab}.interface.ts" ;;
    constants) delete_file "$base/${feature_kebab}.constants.ts" ;;
    slice) delete_file "$base/store/${feature_kebab}.slice.ts" ;;
    api) delete_file "$base/${feature_kebab}.api.ts" ;;
    hooks) delete_folder "$base/hooks" ;;
    components) delete_folder "$base/components" ;;
    *)
      echo "❌ Invalid option. Choose: schema, interface, slice, api, hooks, components, constants."
      exit 1
      ;;
  esac
fi

# --- Redux store cleanup ---
if [ -f "$STORE_FILE" ]; then
  echo "🧹 Cleaning up store references in $STORE_FILE..."

  # Remove import line for reducer
  sed -i "/import { ${feature_camel}Reducer }/d" "$STORE_FILE"

  # Remove reducer registration line
  sed -i "/${feature_camel}: ${feature_camel}Reducer,/d" "$STORE_FILE"

  # Remove leftover double blank lines
  sed -i '/^$/N;/^\n$/D' "$STORE_FILE"

  echo "✅ Cleaned up store references."
else
  echo "⚠️  store.ts not found, skipping store cleanup."
fi

# --- Clean up tagTypes in baseApi.ts ---
if [ -f "$BASE_API_FILE" ]; then
  echo "🧹 Cleaning up tagTypes in baseApi.ts..."

  # Remove the feature tag (e.g. "medicine-brand",)
  sed -i "/\"${feature_kebab}\"/d" "$BASE_API_FILE"

  # Fix possible trailing commas in tagTypes array
  sed -i 's/,\s*]/]/' "$BASE_API_FILE"

  echo "✅ Removed tagType \"${feature_kebab}\" from baseApi.ts"
else
  echo "⚠️  baseApi.ts not found, skipping tagType cleanup."
fi

# --- Search for leftover usages ---
echo "🔍 Checking for other references of '@/features/$feature_kebab'..."
usages=$(grep -rl "@/features/$feature_kebab" src/ 2>/dev/null)

if [ -n "$usages" ]; then
  echo "⚠️  Found potential references to clean up manually:"
  echo "$usages"
else
  echo "✅ No other references found."
fi
