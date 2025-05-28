import { Button, Flex } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLoginMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';
import { useState } from 'react';

const LoginPage = () => {
  const [userLogin] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'user@gmail.com',
      password: 'pass123',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging...');
    try {
      const res = await userLogin(data).unwrap();

      if (res.statusCode === 200) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate('/');
        toast.success('Successfully Login!', { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
      // toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  // if (isLoading) <Loader />;
  // else
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
          Welcome back
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Link to='/forgot-password' style={{ display: 'block', marginBottom: '1rem', color: '#1890ff' }}>
            Forgot password?
          </Link>
          <Button
            htmlType='submit'
            type='primary'
            style={{ width: '100%', backgroundColor: '#0066ff', color: 'white', fontWeight: 'bold' }}
          >
            Login
          </Button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Don't have any account? <Link to='/register'>Register Here</Link>
        </p>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
