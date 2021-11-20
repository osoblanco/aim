import _ from 'lodash';

import { IModel, State } from 'types/services/models/model';
import {
  IAppInitialConfig,
  IAppModelConfig,
} from 'types/services/models/explorer/createAppModel';

import { getItem } from '../storage';
import { decode } from '../encoder/encoder';
import getStateFromUrl from '../getStateFromUrl';

export default function setDefaultAppConfigData<M extends State>({
  config,
  appInitialConfig,
  model,
}: {
  config: IAppModelConfig;
  appInitialConfig: IAppInitialConfig;
  model: IModel<M>;
}): void {
  const { grouping, selectForm, components, appName } = appInitialConfig;

  const liveUpdateConfigHash = getItem(`${appName}LUConfig`);
  const luConfig = liveUpdateConfigHash
    ? JSON.parse(decode(liveUpdateConfigHash))
    : config?.liveUpdate;

  const defaultConfig: IAppModelConfig = { liveUpdate: luConfig };

  if (grouping) {
    defaultConfig.grouping = getStateFromUrl('grouping') || config?.grouping;
  }
  if (selectForm) {
    defaultConfig.select = getStateFromUrl('select') || config?.select;
  }
  if (components.charts) {
    defaultConfig.chart = getStateFromUrl('chart') || config?.chart;
  }
  if (components.table) {
    const tableConfigHash = getItem(`${appName}Table`);
    defaultConfig.table = tableConfigHash
      ? JSON.parse(decode(tableConfigHash))
      : config?.table;
  }
  const configData: IAppModelConfig = _.merge(config, defaultConfig);
  model.setState({ config: configData });
}
