import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Input, Paper, PasswordInput, Text } from '@mantine/core';
import { useFormik } from 'formik';
import { AuthLayout } from 'layouts';
import * as yup from 'yup';

const loginValidation = yup.object().shape({
  login: yup.string().email('Неверный формат').required('Обязательное поле'),
  password: yup.string().min(8, 'Минимум 8 символов').max(32, 'Максимум 32 символа').required('Обязательное поле'),
});

const SignIn: FC = () => {

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    isInitialValid: false,
    onSubmit: values => {
      console.log(values);
    },
    validationSchema: loginValidation,
  });

  return (
    <AuthLayout>
      <Paper component={Flex} direction={'column'} align={'center'} gap={'10px'} w={'320px'} shadow="xl" p="md" radius={'md'}>
        <Text fz={'xl'} fw={600}>Вход</Text>
        <Flex w={'100%'} direction={'column'} gap={'10px'} justify={'space-between'}>
          <Box h={'100px'}>
            <Input.Wrapper
              w={'100%'}
              withAsterisk
              label="Электронная почта"
              description="Формат email"
              error={formik.touched.login ? formik.errors.login : null}
            >
              <Input id="login"
                name="login"
                placeholder="Введите электронную почту"
                value={formik.values.login}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.login ? formik.errors.login : null}/>
            </Input.Wrapper>
          </Box>
          <Box h={'100px'}>
            <PasswordInput
              id="password"
              name="password"
              placeholder="Введите пароль"
              label="Пароль"
              description="Пароль должен содержать от 8 до 32 символов"
              withAsterisk
              error={formik.touched.password ? formik.errors.password : null}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>
        </Flex>
        <Flex direction={'column'} w={'100%'} gap={'10px'}>
          <Button disabled={!formik.isValid}
            onClick={() => formik.handleSubmit()}>
                Вход
          </Button>
          <Flex direction={'column'} align={'center'}>
            <Text>Еще нет аккаунта?</Text>
            <Text component={Link} to={'/sign-up'} td={'underline'}>Регистрация</Text>
          </Flex>
        </Flex>
      </Paper>
    </AuthLayout>
  );
};

export default SignIn;
