# My personal import sort style

[import-sort](https://github.com/renke/import-sort)

```js
import 'bar'

import './bar'

// Native Node modules
import * as bar from 'path'
import bar, * as baz from 'path'
import bar from 'path'
import bar, { baz } from 'path'
import { bar } from 'path'
import type { Bar, Baz } from 'path'

// Absolute modules
import * as bar from 'bar'
import bar, * as baz from 'bar'
import bar from 'bar'
import bar, { baz } from 'bar'
import { bar } from 'bar'
import type { Bar, Baz } from 'bar'

// Relative modules
import * as bar from './bar'
import bar, * as baz from './bar'
import bar from './bar'
import bar, { baz } from './bar'
import { bar } from './bar'
import type { Bar, Baz } from './bar'
```
