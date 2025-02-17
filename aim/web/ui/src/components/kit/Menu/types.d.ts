export type IMenuItem = {
  id: string | number;
  children?: IMenuItem[];
  name: string;
};

export interface IMenuItemProps extends IMenuItem {
  onClickOpen: (key: string) => void;
  activeItemKey: string | number;
  parentId?: string | number;
}

export type MenuData = IMenuItem[];

export type IMenuProps = {
  onChangeActiveItem?: (key: string) => void;
  defaultActiveItemKey?: string;
  data: MenuData;
  title?: string;
};
