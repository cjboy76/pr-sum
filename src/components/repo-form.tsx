import { Button, DatePicker, Form, FormProps } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import dayjs, { type Dayjs } from 'dayjs'

type RepoFormFields = { month: Dayjs }
type RepoFormProps = {
    onFinish: (values: { month: Date }) => void
    isFetching: boolean
}

export function RepoForm({ onFinish, isFetching }: RepoFormProps) {
    const [form] = Form.useForm<RepoFormFields>()
    const initialValues = { month: dayjs() }

    const onFetchPullRequests: FormProps<RepoFormFields>['onFinish'] = (values) => {
        onFinish({ month: values['month'].toDate() })
    }
    return (
        <Form form={{...form}} name='repo-form' layout='inline' initialValues={initialValues} onFinish={onFetchPullRequests}>
            <FormItem name='month'>
                <DatePicker allowClear={false} picker="month" format='YYYY/MM' maxDate={dayjs()} />
            </FormItem>
            <FormItem>
                <Button loading={isFetching} disabled={isFetching} htmlType='submit'>Fetch pull requests</Button>
            </FormItem>
        </Form>
    )
}

