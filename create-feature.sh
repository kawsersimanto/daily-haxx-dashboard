#!/bin/bash

# Usage: ./create-feature.sh polls articles newsletter

# Exit if no argument
if [ $# -eq 0 ]; then
  echo "Please provide at least one feature name."
  exit 1
fi

# Loop through all arguments
for arg in "$@"; do
  # Normalize to lowercase and PascalCase
  feature=$(echo "$arg" | tr '[:upper:]' '[:lower:]')
  FeaturePascal=$(echo "$feature" | sed -r 's/(^|_)([a-z])/\U\2/g')

  # Paths
  base="src/features/$feature"
  components="$base/components"
  hooks="$base/hooks"
  store="$base/store"

  # Create folder structure
  mkdir -p "$components" "$hooks" "$store"

  # --- Create Files ---

  ## Constants
  cat <<EOF > "$base/constants.ts"
export const ${FeaturePascal}Constants = {
  SAMPLE_KEY: "sample-value",
};
EOF

  ## Schema (Zod validation) in schema.ts
  cat <<EOF > "$base/schema.ts"
import { z } from "zod";

export const ${FeaturePascal}Schema = z.object({
  // Example field
  title: z.string().min(1, "Title is required"),
});

export type ${FeaturePascal}SchemaType = z.infer<typeof ${FeaturePascal}Schema>;
EOF

  ## Component (arrow function, named export)
  cat <<EOF > "$components/${FeaturePascal}Card.tsx"
export const ${FeaturePascal}Card = () => {
  return <div>${FeaturePascal}Card</div>;
};
EOF

  ## Hook (arrow function, named export)
  cat <<EOF > "$hooks/use${FeaturePascal}.ts"
export const use${FeaturePascal} = () => {
  // React Query hook logic here
  return {};
};
EOF

  ## Commented-out Zustand store with ESLint disable
  cat <<EOF > "$store/${feature}Store.ts"
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { create } from "zustand";

export interface ${FeaturePascal}State {}

export const use${FeaturePascal}Store = create<${FeaturePascal}State>(() => ({
  // initial state
}));
EOF

  ## API
  cat <<EOF > "$base/api.ts"
export const get${FeaturePascal} = async () => {
  // API logic here
};
EOF

  ## Types
  cat <<EOF > "$base/types.ts"
export interface ${FeaturePascal} {
  id: string;
  // define fields
}
EOF

  echo "Feature '$feature' structure created successfully with constants, schema, components, hooks, store, and API."
done
