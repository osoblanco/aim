import * as d3 from 'd3';

import { IGetAxisScale } from 'types/utils/d3/getAxisScale';

import { CurveEnum } from './';

export default function lineGenerator(
  xScaleValues: IGetAxisScale,
  yScaleValues: IGetAxisScale | { [key: string]: IGetAxisScale },
  curve: CurveEnum = CurveEnum.Linear,
) {
  if (!xScaleValues) {
    return;
  }
  return d3
    .line()
    .x((d) => xScaleValues(d[0]))
    .y((d) =>
      typeof yScaleValues === 'object'
        ? yScaleValues[d[0]](d[1])
        : yScaleValues(d[1]),
    )
    .curve(d3[curve]);
}
