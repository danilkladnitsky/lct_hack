import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Input, Paper, PasswordInput, Text, Title } from '@mantine/core';
import { AuthService } from 'api';
import { useFormik } from 'formik';
import withLayout from 'hoc/withLayout';
import { AuthLayout } from 'layouts';
import * as yup from 'yup';

import useCombinedStore from 'store';

const registerValidation = yup.object().shape({
  login: yup.string().email('Неверный формат').required('Обязательное поле'),
  password: yup.string().min(8, 'Минимум 8 символов').max(32, 'Максимум 32 символа').required('Обязательное поле'),
  confirmation: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательное поле'),
});

const SignUp: FC = () => {
  const { login } = useCombinedStore();

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      confirmation: '',
    },
    isInitialValid: false,
    onSubmit: async values => {
      try {
        await AuthService.register({ login: values.login, password: values.password });
        login();
      } catch (e) {
        console.debug(e);
      }

    },
    validationSchema: registerValidation,
  });

  return (
    <AuthLayout>
      <Paper component={Flex}
        direction={'column'}
        align={'center'}
        gap={'10px'}
        w={'320px'}
        shadow="xl"
        p="md"
        radius={'md'}
        bg={'#252525'}>
        <Title order={2}>Регистрация</Title>
        <Flex w={'100%'}
          direction={'column'}
          gap={'10px'}
          justify={'space-between'}>
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
                // error={formik.touched.login ? formik.errors.login : null}
              />
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
          <Box h={'100px'}>
            <PasswordInput
              id="confirmation"
              name="confirmation"
              placeholder="Повторите пароль"
              label="Пароль еще раз"
              description="Пароль должен содержать от 8 до 32 символов"
              withAsterisk
              error={formik.touched.confirmation ? formik.errors.confirmation : null}
              value={formik.values.confirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>
        </Flex>
        <Flex direction={'column'}
          w={'100%'}
          gap={'10px'}>
          <Button disabled={!formik.isValid}
            onClick={() => formik.handleSubmit()}>
                Регистрация
          </Button>
          <Flex direction={'column'}
            align={'center'}>
            <Text>Уже регистрировались?</Text>
            <Text component={Link}
              to={'/sign-in'}
              td={'underline'}>Вход</Text>
          </Flex>
        </Flex>
      </Paper>
    </AuthLayout>
  );
};

export default withLayout(AuthLayout, <SignUp />);
