import { Card, Collapse, Tag } from "antd"
import { LockOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { ContributionsQuery } from "@/__generated__/types";

type PRListProps = {
  isFetching: boolean
  contributions: ContributionsQuery['viewer']['contributionsCollection']['pullRequestContributionsByRepository'] | undefined
}

export function PRList({ isFetching, contributions }: PRListProps) {
  if (!contributions) return null
  if (isFetching) return <div className="h-40 p-4 grid place-items-center text-gray-500 text-xs"><span>Loading...</span></div>
  return (
    <div className="mt-4 mb-10">
      {contributions.map(contributionByRepo => (<PRCard key={contributionByRepo.repository.name} contributionByRepo={contributionByRepo} />))}
    </div>
  )
}

function CardExtra({ isPrivate, owner }: { isPrivate: boolean, owner: string }) {
  return (
    <div>
      <span className="mr-2 text-gray-500">{owner}</span>
      {isPrivate && <LockOutlined />}
    </div>
  )
}

const tagColorMap = {
  OPEN: 'green',
  CLOSED: 'red',
  MERGED: 'purple'
}

function PRCard({ contributionByRepo }: { contributionByRepo: ContributionsQuery['viewer']['contributionsCollection']['pullRequestContributionsByRepository'][number] }) {
  const items = contributionByRepo.contributions.nodes ? contributionByRepo.contributions.nodes.map((node) => {
    if (!node) return {}
    const Info = () => {
      return <>
        <div><a target="_blank" href={node.pullRequest.url}>{node.pullRequest.url}</a></div>
        <div>Updated at: {dayjs(node.pullRequest.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</div>
      </>
    }
    return {
      key: node.pullRequest.id,
      label: node.pullRequest.title,
      children: <Info />,
      extra: <Tag color={tagColorMap[node.pullRequest.state]}>{node.pullRequest.state}</Tag>,
    }
  }): []
  return (
    <Card
      className="mb-4"
      title={contributionByRepo.repository.name}
      extra={
        <CardExtra
          owner={contributionByRepo.repository.owner.login}
          isPrivate={contributionByRepo.repository.isPrivate} />
      }>
      <Collapse items={items} defaultActiveKey={['1']} />
    </Card>
  )
}

