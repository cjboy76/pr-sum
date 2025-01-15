import { ComponentProps, useState } from 'react'
import { RepoForm } from './repo-form'
import { PRList } from './pr-list'
import { useContributions } from '@/hooks'
import { Button } from 'antd'

export function PRInspector() {
  const [month, setMonth] = useState<Date>()
  const [contributions, fetching] = useContributions(month)

  const onRepoFormFinish: ComponentProps<typeof RepoForm>['onFinish'] = (values) => {
    setMonth(values['month'])
  }

  return (
    <div className='flex flex-col relative'>
      <RepoForm isFetching={fetching} onFinish={onRepoFormFinish} />
      <PRList
        isFetching={fetching}
        contributions={contributions}
      />
      <Button
        size='large'
        color="default" 
        variant="solid"
        className="fixed bottom-5 left-1/2 -translate-x-1/2"
        disabled={fetching || !contributions}
      >
        Generate Summary
      </Button>
    </div>
  )
}

