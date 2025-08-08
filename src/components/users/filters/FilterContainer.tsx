import React from "react";
import RoleFilter from "./RoleFilter";
import SearchFilter from "../../common/filters/SearchFilter";
import AllFilter from "../../common/filters/AllFilter";
import { ICookieKeys } from "@/types/common";
import { getCookieValue } from "@/lib/common/cookie-utils";
import UserStatusFilter from "../../common/filters/UserStatusFilter";

export default async function FilterContainer() {
  let finalUserRole = null;
  if (!finalUserRole) {
    try {
      finalUserRole = await getCookieValue(ICookieKeys.USER_ROLE);
    } catch (error) {
      console.error("Error getting user role from cookie:", error);
      finalUserRole = null;
    }
  }

  return (
    <div className="flex items-center  border-border px-2 py-1 gap-2 sm:gap-0 flex-wrap">
      <div className="flex items-center gap-2 flex-wrap">
        <AllFilter />
        <RoleFilter userRole={finalUserRole} />
        <UserStatusFilter />
      </div>
      <SearchFilter className="w-full sm:w-fit sm:ml-auto" />
    </div>
  );
}
