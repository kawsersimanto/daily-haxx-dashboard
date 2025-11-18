#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Please provide at least one feature name."
  exit 1
fi

STORE_FILE="src/redux/store.ts"
BASE_API_FILE="src/redux/api/baseApi.ts"

# Convert kebab-case to PascalCase (e.g. medicine-brand → MedicineBrand)
to_pascal_case() {
  echo "$1" | sed -E 's/(^|-)([a-z])/\U\2/g'
}

# Convert kebab-case to camelCase (e.g. medicine-brand → medicineBrand)
to_camel_case() {
  str=$(echo "$1" | sed -E 's/-([a-z])/\U\1/g')
  echo "${str}"
}

for arg in "$@"; do
  feature_kebab=$(echo "$arg" | tr '[:upper:]' '[:lower:]')   # e.g. medicine-brand
  feature_pascal=$(to_pascal_case "$feature_kebab")           # e.g. MedicineBrand
  feature_camel=$(to_camel_case "$feature_kebab")             # e.g. medicineBrand

  base="src/features/$feature_kebab"
  components="$base/components"
  hooks="$base/hooks"
  store="$base/store"

  mkdir -p "$components" "$hooks" "$store"

  # --- constants file ---
  : > "$base/${feature_kebab}.constants.ts"

  # --- schema file ---
  cat <<EOF > "$base/${feature_kebab}.schema.ts"
import { z } from "zod";

export const ${feature_pascal}Schema = z.object({});

export type ${feature_pascal}SchemaType = z.infer<typeof ${feature_pascal}Schema>;
EOF

  # --- interface file ---
  cat <<EOF > "$base/${feature_kebab}.interface.ts"
export interface I${feature_pascal} {
  id: string;
}
EOF

  # --- api file ---
  cat <<EOF > "$base/${feature_kebab}.api.ts"
import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { I${feature_pascal} } from "./${feature_kebab}.interface";

export const ${feature_camel}Api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    get${feature_pascal}s: builder.query<ApiResponse<I${feature_pascal}[]>, void>({
      query: () => "/${feature_kebab}",
      providesTags: ["${feature_kebab}"],
    }),
    get${feature_pascal}ById: builder.query<ApiResponse<I${feature_pascal}>, string>({
      query: (id) => \`/${feature_kebab}/\${id}\`,
      providesTags: ["${feature_kebab}"],
    }),
    create${feature_pascal}: builder.mutation<I${feature_pascal}, Partial<I${feature_pascal}>>({
      query: (body) => ({ url: "/${feature_kebab}", method: "POST", body }),
      invalidatesTags: ["${feature_kebab}"],
    }),
    update${feature_pascal}: builder.mutation<I${feature_pascal}, Partial<I${feature_pascal}> & { id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: \`/${feature_kebab}/\${id}\`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["${feature_kebab}"],
      }
    ),
    delete${feature_pascal}: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: \`/${feature_kebab}/\${id}\`, method: "DELETE" }),
      invalidatesTags: ["${feature_kebab}"],
    }),
  }),
});

export const {
  useGet${feature_pascal}sQuery,
  useGet${feature_pascal}ByIdQuery,
  useCreate${feature_pascal}Mutation,
  useUpdate${feature_pascal}Mutation,
  useDelete${feature_pascal}Mutation,
} = ${feature_camel}Api;
EOF

  # --- slice file ---
  cat <<EOF > "$store/${feature_kebab}.slice.ts"
import { createSlice } from "@reduxjs/toolkit";

export const ${feature_camel}Slice = createSlice({
  name: "${feature_kebab}",
  initialState: {},
  reducers: {},
});

export const {} = ${feature_camel}Slice.actions;
export const ${feature_camel}Reducer = ${feature_camel}Slice.reducer;
EOF

  # --- hook file ---
  cat <<EOF > "$hooks/use${feature_pascal}.ts"
// Custom hook for ${feature_pascal}
EOF

  # --- component file ---
  cat <<EOF > "$components/${feature_pascal}.tsx"
export const ${feature_pascal} = () => {
  return <div>${feature_pascal}</div>;
};
EOF

  # --- Update redux/store.ts ---
  if [ -f "$STORE_FILE" ]; then
    if ! grep -q "${feature_camel}Reducer" "$STORE_FILE"; then
      sed -i "/import { baseApi }/a import { ${feature_camel}Reducer } from \"@/features/${feature_kebab}/store/${feature_kebab}.slice\";" "$STORE_FILE"
      sed -i "/combineReducers({/a \ \ ${feature_camel}: ${feature_camel}Reducer," "$STORE_FILE"
      echo "🧩 Added ${feature_camel}Reducer to store.ts"
    else
      echo "ℹ️  Reducer already exists in store.ts"
    fi
  else
    echo "⚠️  store.ts not found. Skipping reducer registration."
  fi

  # --- Update redux/api/baseApi.ts ---
  if [ -f "$BASE_API_FILE" ]; then
    # ✅ keep kebab-case for tags (e.g. "medicine-brand")
    if ! grep -q "\"${feature_kebab}\"" "$BASE_API_FILE"; then
      sed -i "/tagTypes: \[/a\ \ \ \ \"${feature_kebab}\"," "$BASE_API_FILE"
      echo "✅ Added tagType \"${feature_kebab}\" to baseApi"
    else
      echo "ℹ️  tagType \"${feature_kebab}\" already exists in baseApi"
    fi
  else
    echo "⚠️  baseApi.ts not found. Skipping tag addition."
  fi

  echo "✅ Feature '$feature_kebab' created successfully."
done
