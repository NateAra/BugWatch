import prisma from '@/prisma/client'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuesPage = async () => {

  const issues = await prisma.issue.findMany();

  return (
    <div>
      <Button>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>
    </div>
  )
}

export default IssuesPage