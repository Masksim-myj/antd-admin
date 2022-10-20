export interface UserInfo {
  admin: boolean;
  avatar: string;
  userId: string | number;
  username: string;
  realName: string;
  desc?: string;
  homePath?: string;
  roles: RoleInfo[];
  beginTime: string | null;
  createBy: string;
  createTime: string;
  dataScope: null;
  delFlag: string;
  dept: {
    children: string[];
    [x: string]: string | null;
  };
  deptId: string | null;
  email: string | null;
  endTime: string | null;
  loginDate: string | null;
  loginIp: string | null;
  nickName: string | null;
  password: string | null;
  phonenumber: string | null;
  postIds: string | null;
  remark: string | null;
  roleId: string | null;
  roleIds: string | null;
  roles: any[];
  searchValue: null;
  sex: string | null;
  status: string | null;
  updateBy: null;
  updateTime: null;
  userId: string;
  userName: string;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
