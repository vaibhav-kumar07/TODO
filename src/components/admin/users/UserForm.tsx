'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User } from '@/lib/user-api';
import { UserRole } from '@/types/auth';
import { errorToast, successToast } from '@/components/hooks/use-toast';
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
  isEmailVerified: z.boolean(),
});

interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
}

interface UserFormProps {
  mode: 'create' | 'update';
  user?: User;
  onSubmit: (data: UserFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UserForm({ 
  mode, 
  user, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    firstName: '',
    lastName: '',
    role: UserRole.MEMBER,
    isActive: true,
  });

  // Initialize form data when user is provided (update mode)
  useEffect(() => {
    if (user && mode === 'update') {
      setFormData({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
      });
    }
  }, [user, mode]);

  const handleInputChange = (field: keyof UserFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

      {/* Role */}
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
            {/* <SelectItem value={UserRole.ADMIN}>Admin</SelectItem> */}
            <SelectItem value={UserRole.MANAGER}>Manager</SelectItem>
            <SelectItem value={UserRole.MEMBER}>Member</SelectItem>
          </SelectContent>
        </Select>
      </div>

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