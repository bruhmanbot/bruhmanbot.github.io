import { genTable, fillInNavFooter } from "./report.js";
genTable([24], '24')

genTable([13, 15, 16, 17, 22, 23, 35, 36, 37, 38], "sample1-i")
genTable([42, 42, 42, 46, 46, 46], 'sample1-o')
genTable([13], 'sample1-d')

genTable([15, 16, 17, 35, 36, 37, 38], "sample1-ai")
genTable([42, 42, 42, 46, 46, 46, 22, 24, 23], 'sample1-ao')

genTable([11, 15, 21, 22, 23, 35, 36, 37, 43, 43], "sample2-i")
genTable([41, 41, 41, 38, 38, 38], 'sample2-o')
genTable([11, 15, 21], 'sample2-d')

genTable([15, 21, 35, 36, 37, 43, 43], "sample2-ai")
genTable([41, 41, 41, 38, 38, 38, 22, 24, 23], 'sample2-ao')

// sample 3 4
genTable([17], '17')
genTable([23, 23, 23, 13, 14, 15], 'sample3-o')
genTable([15, 16, 18, 19, 24, 25, 26, 27, 29, 29], 'sample3-i')

genTable([15, 16], 'lowps')
genTable([17], 'lowps-u')
genTable([18, 19], 'highps')
genTable([14, 17], 'highps-u')


fillInNavFooter('Computer play')