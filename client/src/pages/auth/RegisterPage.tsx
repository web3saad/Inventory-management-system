import { Button, Flex } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toastMessage from '../../lib/toastMessage';
import { useRegisterMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';
import { toast } from 'sonner';
import { useState } from 'react';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userRegistration] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Registering new account!');
    try {
      const res = await userRegistration(data).unwrap();

      if (data.password !== data.confirmPassword) {
        toastMessage({ icon: 'error', text: 'Password and confirm password must be same!' });
        return;
      }
      if (res.statusCode === 201) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate('/');
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <Flex justify='center' align='center' style={{ height: '100vh', backgroundColor: 'white' }}>
      <Flex
        vertical
        style={{
          width: '400px',
          padding: '3rem',
          border: '1px solid #164863',
          borderRadius: '.6rem',
        }}
      >
        <h1 style={{ marginBottom: '.7rem', textAlign: 'center', fontWeight: 'bold' }}>
          Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='name' style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
            Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id='name'
            type='text'
            {...register('name', { required: true })}
            placeholder='Your Name'
            className={`input-field ${errors['name'] ? 'input-field-error' : ''}`}
            style={{ marginBottom: '1rem' }}
          />
          <label htmlFor='email' style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
            Email <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id='email'
            type='text'
            {...register('email', { required: true })}
            placeholder='name@email.com'
            className={`input-field ${errors['email'] ? 'input-field-error' : ''}`}
            style={{ marginBottom: '1rem' }}
          />
          <label htmlFor='password' style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
            Password <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              className={`input-field ${errors['password'] ? 'input-field-error' : ''}`}
              {...register('password', { required: true })}
              style={{ width: '100%', paddingRight: '2rem' }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <label htmlFor='confirmPassword' style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
            Confirm Password <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <input
              id='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm your password'
              className={`input-field ${errors['confirmPassword'] ? 'input-field-error' : ''}`}
              {...register('confirmPassword', { required: true })}
              style={{ width: '100%', paddingRight: '2rem' }}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <Button
            htmlType='submit'
            type='primary'
            style={{ width: '100%', backgroundColor: '#0066ff', color: 'white', fontWeight: 'bold' }}
          >
            Register
          </Button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Already have an account? <Link to='/login'>Login Here</Link>
        </p>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
