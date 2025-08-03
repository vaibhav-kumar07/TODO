import ClassCapacityWidget from "../classes/widget/ClassCapacityWidget";
import ClassDetailWidget from "../classes/widget/ClassDetailWidget";
import ClassTableStatus from "../classes/widget/ClassStatusWidget";
import EditAndDeleteClassWidget from "../classes/widget/EditAndDeleteClass";
import EquipmentDetailWidget from "../equipment/widget/EquipmentDetailWidget";
import EditAndDeleteMemberWidget from "../member/owner/widget/EditAndDeleteMemberWidget";
import MemberDetailWidget from "../member/owner/widget/MemberDetailWidget";
import MemberTableStatus from "../member/owner/widget/MemberTableStatus";
import OwnerPriorityBadge from "../profile/owner/OwnerPriorityBadge";
import OwnerStatusBadge from "../profile/owner/OwnerStatusBadge";
import StatusWidget from "./StatusWidget";
import { IClass } from "@/lib/classes";
import { IEquipment } from "@/lib/equipment";
import { IMember } from "@/lib/member";

const widgets: any = {
  statusWidget: () => {
    return <StatusWidget />;
  },
  memberDetailWidget: (value: string, rowData: IMember) => {
    console.log("value", value);
    return <MemberDetailWidget rowData={rowData} />;
  },

  memberTableStatus: (value: string, rowData: IMember) => {
    console.log("rowData", rowData);
    return <MemberTableStatus value={value} />;
  },

  editAndDeleteMemberWidget: () => {
    return <EditAndDeleteMemberWidget />;
  },
  classDetailWidget: (value: string, rowData: IClass) => {
    console.log("value", value);
    return <ClassDetailWidget rowData={rowData} />;
  },

  classTableStatus: (value: string, rowData: IMember) => {
    console.log("rowData", rowData);
    return <ClassTableStatus value={value} />;
  },
  editAndDeleteClassWidget: () => {
    return <EditAndDeleteClassWidget />;
  },
  classCapacityWidget: (value: string, rowData: IClass) => {
    console.log("value", value);
    return <ClassCapacityWidget rowData={rowData} />;
  },
  equipmentDetailWidget: (value: string, rowData: IEquipment) => {
    console.log("value", value);
    return <EquipmentDetailWidget rowData={rowData} />;
  },

  ownerStatusBadge: (value: string) => {
    return <OwnerStatusBadge value={value} />;
  },
  ownerPriorityBadge: (value: string) => {
    return <OwnerPriorityBadge value={value} />;
  },
};
export default function WidgetLibrary({
  widgetName,
  value,
  rowData,
}: {
  widgetName: string;
  value: string;
  rowData?: any;
  className?: string;
}) {
  return widgets[widgetName](value, rowData);
}
