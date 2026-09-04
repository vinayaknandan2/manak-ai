import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import RegisterForm from '../features/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
