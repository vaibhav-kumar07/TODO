'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User } from '@/lib/user-api';
import { UserRole } from '@/types/auth';
import { inviteUserAction, updateUserAction } from '@/actions/user';
import { errorToast, successToast } from '@/components/hooks/use-toast';
import { Plus, User as UserIcon, Pencil } from 'lucide-react';
import UserForm, { UserFormData } from './UserForm';
import CommonButton from '@/components/common/Button';

interface UserManagementDialogProps {
  mode: 'create' | 'update';
  user?: User;
  currentUserRole?: UserRole;
  children?: React.ReactNode;
  onSuccess?: () => void;
}

export default function UserManagementDialog({ 
  mode, 
  user, 
  currentUserRole,
  children, 
  onSuccess 
}: UserManagementDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: UserFormData) => {
    setIsLoading(true);

    try {
      let result;

      if (mode === 'create') {
        result = await inviteUserAction({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
        });
      } else {
        if (!user?.id) {
          errorToast('User ID is required for update');
          return;
        }

        result = await updateUserAction(user.id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
          isActive: formData.isActive,
        });
      }

      if (result.success) {
        successToast(result.message || 'Operation completed successfully');
        setIsOpen(false);
        onSuccess?.();
      } else {
        errorToast(result.message || 'Operation failed');
      }
    } catch (error) {
      errorToast('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const getDialogTitle = () => {
    return mode === 'create' ? 'Invite New User' : 'Update User';
  };

  const getTriggerButton = () => {
    if (children) return children;
    
    return mode === 'create' ? (
      <CommonButton  className=" h-10 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
        <Plus className="h-4 w-4" />
        <span>Add User</span>
      </CommonButton >
    ) : (
        <Pencil className="h-4 w-4 cursor-pointer" />
      
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {getTriggerButton()}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserIcon className="h-5 w-5" />
            <span>{getDialogTitle()}</span>
          </DialogTitle>
        </DialogHeader>
        <UserForm
          mode={mode}
          user={user}
          currentUserRole={currentUserRole}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
} 