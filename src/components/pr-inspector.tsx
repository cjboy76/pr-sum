import { ComponentProps, useState } from 'react'
import { RepoForm } from './repo-form'
import { PRList } from './pr-list'
import { useContributions } from '@/hooks'
import { Button } from 'antd'

export function PRInspector() {
  const [month, setMonth] = useState<Date>()
  const { data: contributionsData, loading } = useContributions(month)
  const contributions = contributionsData?.viewer.contributionsCollection.pullRequestContributionsByRepository

  const onRepoFormFinish: ComponentProps<typeof RepoForm>['onFinish'] = (values) => {
    setMonth(values['month'])
  }

  const onGenerate = () => {

  }

  return (
    <div className='flex flex-col relative'>
      <RepoForm isFetching={loading} onFinish={onRepoFormFinish} />
      <PRList
        isFetching={loading}
        contributions={contributions}
      />
      <Button
        size='large'
        color="default"
        variant="solid"
        className="fixed bottom-5 left-1/2 -translate-x-1/2"
        disabled={loading || !contributions}
        onClick={onGenerate}
      >
        Generate Summary
      </Button>
    </div>
  )
}

