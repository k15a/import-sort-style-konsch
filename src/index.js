const style = ({
  and,
  not,
  hasDefaultMember,
  hasNamedMembers,
  hasNamespaceMember,
  hasNoMember,
  isNodeModule,
  hasOnlyDefaultMember,
  hasOnlyNamedMembers,
  hasOnlyNamespaceMember,
  dotSegmentCount,
  isAbsoluteModule,
  isRelativeModule,
  moduleName,
  name,
  naturally,
}) => {
  const isTypeImport = imported => imported.type === 'import-type'

  const sortModuleNames = [
    (a, b) => 0 - dotSegmentCount(a, b),
    moduleName(naturally),
  ]

  const sortModules = moduleType => [
    // import * as bar from 'bar'
    {
      match: and(hasOnlyNamespaceMember, moduleType),
      sort: sortModuleNames,
    },

    // import bar, * as baz from 'bar'
    {
      match: and(hasDefaultMember, hasNamespaceMember, moduleType),
      sort: sortModuleNames,
    },

    // import bar from 'bar'
    {
      match: and(hasOnlyDefaultMember, moduleType),
      sort: sortModuleNames,
    },

    // import bar, { baz } from 'bar'
    {
      match: and(hasDefaultMember, hasNamedMembers, moduleType),
      sort: sortModuleNames,
      sortNamedMembers: name(naturally),
    },

    // import { bar } from 'bar'
    {
      match: and(not(isTypeImport), hasOnlyNamedMembers, moduleType),
      sort: sortModuleNames,
      sortNamedMembers: name(naturally),
    },

    // import type { Bar, Baz } from 'bar'
    {
      match: and(isTypeImport, hasOnlyNamedMembers, moduleType),
      sort: sortModuleNames,
      sortNamedMembers: name(naturally),
    },
  ]

  return [
    // import 'bar'
    {
      match: and(hasNoMember, isAbsoluteModule),
    },

    {
      separator: true,
    },

    // import './bar'
    {
      match: and(hasNoMember, isRelativeModule),
    },

    {
      separator: true,
    },

    ...sortModules(isNodeModule),

    {
      separator: true,
    },

    ...sortModules(isAbsoluteModule),

    {
      separator: true,
    },

    ...sortModules(isRelativeModule),

    {
      separator: true,
    },
  ]
}

module.exports = style
