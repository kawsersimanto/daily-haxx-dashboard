#!/bin/bash

# Usage:
# ./delete-feature.sh featureName              -> deletes entire feature folder
# ./delete-feature.sh featureName schema      -> deletes only schema file
# ./delete-feature.sh featureName interface   -> deletes only interface file
# ./delete-feature.sh featureName slice       -> deletes only slice file
# ./delete-feature.sh featureName api         -> deletes only api file
# ./delete-feature.sh featureName hooks       -> deletes hooks folder
# ./delete-feature.sh featureName components  -> deletes components folder
# ./delete-feature.sh featureName constants   -> deletes constants file

if [ $# -lt 1 ]; then
  echo "Please provide a feature name."
  exit 1
fi

feature=$(echo "$1" | tr '[:upper:]' '[:lower:]')
FeaturePascal=$(echo "$feature" | sed -r 's/(^|_)([a-z])/\U\2/g')
base="src/features/$feature"
STORE_FILE="src/redux/store.ts"

delete_file() {
  if [ -f "$1" ]; then
    rm "$1"
    echo "Deleted $1"
  else
    echo "File $1 does not exist."
  fi
}

delete_folder() {
  if [ -d "$1" ]; then
    rm -rf "$1"
    echo "Deleted folder $1"
  else
    echo "Folder $1 does not exist."
  fi
}

# If no second argument, delete entire feature
if [ $# -eq 1 ]; then
  delete_folder "$base"
  echo "✅ Feature '$feature' deleted."
else
  case $2 in
    schema) delete_file "$base/${feature}.schema.ts" ;;
    interface) delete_file "$base/${feature}.interface.ts" ;;
    slice) delete_file "$base/store/${feature}.slice.ts" ;;
    api) delete_file "$base/${feature}.api.ts" ;;
    hooks) delete_folder "$base/hooks" ;;
    components) delete_folder "$base/components" ;;
    constants) delete_file "$base/${feature}.constants.ts" ;;
    *) echo "Invalid option. Choose: schema, interface, slice, api, hooks, components, constants." ; exit 1 ;;
  esac
fi

# --- Remove slice import, reducer registration, and whitelist entry in store.ts ---
if [ -f "$STORE_FILE" ]; then
  # Remove import line
  sed -i "/import { ${feature}Slice/d" "$STORE_FILE"

  # Remove reducer registration line
  sed -i "/${feature}: ${feature}Slice.reducer,/d" "$STORE_FILE"

  # Remove feature from whitelist array safely
  # 1. Remove the feature name
  sed -i "/whitelist:/ s/\"${feature}\"[,]*/ /g" "$STORE_FILE"
  # 2. Fix possible leading/trailing commas
  sed -i "/whitelist:/ s/\[ *, */\[/g" "$STORE_FILE"
  sed -i "/whitelist:/ s/ *, *\]/\]/g" "$STORE_FILE"
fi

# --- Search for remaining usages in codebase ---
echo "Checking for other usages of the feature..."
grep -rl "@/features/$feature" src/ || echo "No other usages found."

