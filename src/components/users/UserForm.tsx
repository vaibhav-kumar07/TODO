'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User } from '@/lib/user-api';
import { UserRole } from '@/types/auth';
import { errorToast,  } from '@/components/hooks/use-toast';
import { z } from 'zod';
import CommonButton from '@/components/common/Button';

// Zod schemas for validation
const createUserSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.nativeEnum(UserRole),
});

const updateUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.nativeEnum(UserRole),
  isActive: z.boolean(),
});

export interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
}

interface UserFormProps {
  mode: 'create' | 'update';
  user?: User;
  currentUserRole?: UserRole; // Current user's role for permissions
  onSubmit: (data: UserFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UserForm({ 
  mode, 
  user, 
  currentUserRole,
  onSubmit, 
  onCancel, 
  isLoading = false 
}: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName ||  '',
    role: user?.role.toUpperCase()==UserRole.MEMBER ? UserRole.MEMBER : user?.role.toUpperCase() ===UserRole.MANAGER ? UserRole.MANAGER : UserRole.ADMIN,
    isActive: user?.isActive || true,
    
  });

  const handleInputChange = (field: keyof UserFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Get available role options based on current user's role
  const getAvailableRoles = (): UserRole[] => {
    if (!currentUserRole) return [UserRole.MEMBER, UserRole.MANAGER];

    switch (currentUserRole) {
      case UserRole.ADMIN:
        // Admin can assign any role except to themselves
        return [UserRole.MEMBER, UserRole.MANAGER, UserRole.ADMIN];
      case UserRole.MANAGER:
        // Manager can only assign MEMBER and MANAGER roles
        return [UserRole.MEMBER, UserRole.MANAGER];
      case UserRole.MEMBER:
        // Members cannot assign roles
        return [];
      default:
        return [UserRole.MEMBER, UserRole.MANAGER];
    }
  };

  const validateForm = (): boolean => {
    try {
      if (mode === 'create') {
        createUserSchema.parse(formData);
      } else {
        updateUserSchema.parse(formData);
      }
      return true;
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        errorToast(firstError.message);
      } else {
        errorToast('Validation failed');
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    await onSubmit(formData);
  };

  const availableRoles = getAvailableRoles();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email field - only for create mode */}
      {mode === 'create' && (
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isLoading}
            placeholder="Enter email address"
          />
        </div>
      )}

      {/* First Name */}
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          type="text"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          disabled={isLoading}
          placeholder="Enter first name"
        />
      </div>

      {/* Last Name */}
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          type="text"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          disabled={isLoading}
          placeholder="Enter last name"
        />
      </div>

      {/* Role - only show if there are available roles */}
      {availableRoles.length > 0 && (
        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleInputChange('role', value as UserRole)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {availableRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Status switches - only for update mode */}
      {mode === 'update' && (
        <>
          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Active Status</Label>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange('isActive', checked)}
              disabled={isLoading}
            />
          </div>
        </>
      )}

      {/* Action buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <CommonButton
          type="submit"
          // variant="outline"
          loading={isLoading}
          disabled={isLoading}
          className='h-10 px-4'
        >
          { mode === 'create' ? 'Invite User' : 'Update User'}
        </CommonButton>
      </div>
    </form>
  );
} 