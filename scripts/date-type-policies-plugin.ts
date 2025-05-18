import { PluginFunction, Types } from '@graphql-codegen/plugin-helpers';
import { getNamedType, GraphQLSchema, isObjectType } from 'graphql';

const FN_THUMB = '__TRANSFORM__';

const plugin: PluginFunction = async (
  schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  _config: { scalarName?: string } = {},
) => {
  const scalarName = _config.scalarName || 'DateTime';
  const typePolicies: Record<
    string,
    { fields: Record<string, { read: string }> }
  > = {};

  const typeMap = schema.getTypeMap();

  for (const typeName in typeMap) {
    const type = typeMap[typeName];

    if (isObjectType(type)) {
      const fields: Record<string, { read: string }> = {};

      for (const [fieldName, field] of Object.entries(type.getFields())) {
        const baseType = getNamedType(field.type);

        if (baseType.name === scalarName) {
          fields[fieldName] = { read: FN_THUMB };
        }
      }

      if (Object.keys(fields).length > 0) {
        typePolicies[typeName] = { fields };
      }
    }
  }

  const policies = JSON.stringify(typePolicies, null, 2).replace(
    new RegExp(`"${FN_THUMB}"`, 'g'),
    '(date: string) => new Date(date)',
  );

  return `import { TypePolicies } from "@apollo/client";

  export const dateTypePolicies: TypePolicies = ${policies};`;
};

export { plugin };
