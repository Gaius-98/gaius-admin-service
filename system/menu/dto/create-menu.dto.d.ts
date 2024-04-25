export declare class CreateMenuDto {
    label: string;
    pid?: string;
    menuType: 'app' | 'directory';
    desc?: string;
    icon?: string;
    sortNum: number;
    type: 'table' | 'page' | 'front' | 'form';
    openType: '_blank' | '_self';
    address?: string;
}
