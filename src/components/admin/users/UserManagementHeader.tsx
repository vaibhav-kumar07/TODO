
import PageHeader from '@/components/common/PageHeader';
import UserManagementDialog from './UserManagementDialog';

export default function UserManagementHeader() {
  return (
    <div className="flex items-center justify-between">
      <PageHeader label="User Management" />
      <UserManagementDialog mode="create" />
    </div>
  );
} 