#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Please provide at least one feature name."
  exit 1
fi

STORE_FILE="src/redux/store.ts"

for arg in "$@"; do
  feature=$(echo "$arg" | tr '[:upper:]' '[:lower:]')
  FeaturePascal=$(echo "$feature" | sed -r 's/(^|_)([a-z])/\U\2/g')

  base="src/features/$feature"
  components="$base/components"
  hooks="$base/hooks"
  store="$base/store"

  mkdir -p "$components" "$hooks" "$store"

  : > "$base/${feature}.constants.ts"

  cat <<EOF > "$base/${feature}.schema.ts"
import { z } from "zod";

export const ${FeaturePascal}Schema = z.object({});

export type ${FeaturePascal}SchemaType = z.infer<typeof ${FeaturePascal}Schema>;
EOF

  cat <<EOF > "$base/${feature}.interface.ts"
export interface ${FeaturePascal} {
  id: string;
}
EOF

  cat <<EOF > "$base/${feature}.api.ts"
import { baseApi } from "@/redux/api/baseApi";
import { ${FeaturePascal} } from "./${feature}.interface";

export const ${feature}Api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    get${FeaturePascal}s: builder.query<${FeaturePascal}[], void>({
      query: () => "/${feature}",
    }),
    get${FeaturePascal}ById: builder.query<${FeaturePascal}, string>({
      query: (id) => \`/${feature}/\${id}\`,
    }),
    create${FeaturePascal}: builder.mutation<${FeaturePascal}, Partial<${FeaturePascal}>>({
      query: (body) => ({ url: "/${feature}", method: "POST", body }),
    }),
    update${FeaturePascal}: builder.mutation<${FeaturePascal}, Partial<${FeaturePascal}> & { id: string }>(
      { query: ({ id, ...body }) => ({ url: \`/${feature}/\${id}\`, method: "PUT", body }) }
    ),
    delete${FeaturePascal}: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: \`/${feature}/\${id}\`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGet${FeaturePascal}sQuery,
  useGet${FeaturePascal}ByIdQuery,
  useCreate${FeaturePascal}Mutation,
  useUpdate${FeaturePascal}Mutation,
  useDelete${FeaturePascal}Mutation,
} = ${feature}Api;
EOF

  cat <<EOF > "$store/${feature}.slice.ts"
import { createSlice } from "@reduxjs/toolkit";

export const ${feature}Slice = createSlice({
  name: "${feature}",
  initialState: {},
  reducers: {},
});

export const {} = ${feature}Slice.actions;
export const ${feature}Reducer = ${feature}Slice.reducer;
EOF

  cat <<EOF > "$hooks/use${FeaturePascal}.ts"
import { useGet${FeaturePascal}sQuery } from "@/features/${feature}/${feature}.api";

export const use${FeaturePascal} = () => {
  const { data, isLoading, error } = useGet${FeaturePascal}sQuery();
  return { data, isLoading, error };
};
EOF

  cat <<EOF > "$components/${FeaturePascal}.tsx"
export const ${FeaturePascal} = () => {
  return <div>${FeaturePascal}</div>;
};
EOF

  # --- Update redux/store.ts ---
  if ! grep -q "${feature}Slice" "$STORE_FILE"; then
    sed -i "/import { baseApi }/a import { ${feature}Slice } from \"@/features/${feature}/store/${feature}.slice\";" "$STORE_FILE"
    sed -i "/const rootReducer = combineReducers(/a \ \ \ \ ${feature}: ${feature}Slice.reducer," "$STORE_FILE"
    sed -i "s/whitelist: \[/&\"${feature}\", /" "$STORE_FILE"
  fi

  echo "✅ Feature '$feature' created successfully."
done
