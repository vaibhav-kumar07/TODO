
import PageHeader from '@/components/common/PageHeader';
import UserManagementDialog from './UserManagementDialog';

export default function UserManagementHeader() {
  return (
    <div className="flex items-center justify-between px-2 py-1">
      <PageHeader label="User Management" />
      <UserManagementDialog mode="create" />
    </div>
  );
} 