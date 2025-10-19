#!/bin/bash

# Usage examples:
# ./delete-feature.sh featureName              -> deletes entire feature folder
# ./delete-feature.sh featureName schema       -> deletes only schema file
# ./delete-feature.sh featureName interface    -> deletes only interface file
# ./delete-feature.sh featureName slice        -> deletes only slice file
# ./delete-feature.sh featureName api          -> deletes only api file
# ./delete-feature.sh featureName hooks        -> deletes hooks folder
# ./delete-feature.sh featureName components   -> deletes components folder
# ./delete-feature.sh featureName constants    -> deletes constants file

if [ $# -lt 1 ]; then
  echo "Please provide a feature name."
  exit 1
fi

feature=$(echo "$1" | tr '[:upper:]' '[:lower:]')
FeaturePascal=$(echo "$feature" | sed -r 's/(^|_)([a-z])/\U\2/g')
base="src/features/$feature"
STORE_FILE="src/redux/store.ts"

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
  echo "✅ Entire feature '$feature' deleted."
else
  case $2 in
    schema) delete_file "$base/${feature}.schema.ts" ;;
    interface) delete_file "$base/${feature}.interface.ts" ;;
    constants) delete_file "$base/${feature}.constants.ts" ;;
    slice) delete_file "$base/store/${feature}.slice.ts" ;;
    api) delete_file "$base/${feature}.api.ts" ;;
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
  sed -i "/import { ${feature}Reducer }/d" "$STORE_FILE"

  # Remove reducer registration line
  sed -i "/${feature}: ${feature}Reducer,/d" "$STORE_FILE"

  # Optional: clean up any empty lines left behind
  sed -i '/^$/N;/^\n$/D' "$STORE_FILE"
fi

# --- Search for leftover usages in project ---
echo "🔍 Checking for other references of '@/features/$feature'..."
usages=$(grep -rl "@/features/$feature" src/ 2>/dev/null)

if [ -n "$usages" ]; then
  echo "⚠️  Found potential references:"
  echo "$usages"
else
  echo "✅ No other references found."
fi
