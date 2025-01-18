import { ComponentProps, useState } from 'react'
import { RepoForm } from './repo-form'
import { PRList } from './pr-list'
import { useContributions } from '@/hooks'
import { Button, message } from 'antd'
import { getPrompt } from '@/lib/utils'

export function PRInspector() {
  const [month, setMonth] = useState<Date>()
  const { data: contributionsData, loading: isContributionsLoading } = useContributions(month)
  const contributions = contributionsData?.viewer.contributionsCollection.pullRequestContributionsByRepository

  const onRepoFormFinish: ComponentProps<typeof RepoForm>['onFinish'] = (values) => {
    setMonth(values['month'])
  }

  function onCopyClick() {
    if (!contributions) return
    navigator.clipboard.writeText(getPrompt(contributions))
    message.success('Copied to your clipboard!')
}

  return (
    <div className='flex flex-col relative'>
      <div className='flex justify-between'>
        <RepoForm isFetching={isContributionsLoading} onFinish={onRepoFormFinish} />
        <Button disabled={isContributionsLoading} onClick={onCopyClick}>Copy</Button>
      </div>
      <PRList
        isFetching={isContributionsLoading}
        contributions={contributions}
      />
    </div>
  )
}

