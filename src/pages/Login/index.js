import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '../../store/modules/user'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../utils'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values)
        // async action fetchLogin
        await dispatch(fetchLogin(values))
        if (getToken()) {
            // 1. Go to the offeragent page
            navigate('/offeragent')
            // 2. Prompt login success
            message.success('Login Success!')
        }
    }
    return (
        <div className="login">
            <Card className="login-container">
                <p>OfferAgent</p>
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item
                        name="mobile"
                        // validate the first one first, then validate the second one if the first one passes
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number',
                            },
                            {
                                pattern: /^[689]\d{7}$/,
                                message: 'Please enter a valid phone number format, starting with 6, 8, or 9.'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="Please Input Your Phone Number (8 Digits)" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please Input Your Password',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Please input the verification code" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Log In
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>
    )
}

export default Login