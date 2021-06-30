import daoList from '@1hive/gardens-dao-list'
import { addressesEqual } from './web3-utils'

const dafaultForumURL = 'https://forum.1hive.org/'

export function getGardenLabel(address) {
  const dao = daoList.daos.find(dao => addressesEqual(dao.address, address))
  return dao?.name || address
}

export function getGardenForumUrl(metadata) {
  if (metadata.forum) {
    return metadata.forum
  }

  if (metadata.links) {
    const forumItem = Object.values(metadata.links)
      .map(linkTopic => Object.values(linkTopic))
      .flat()
      .find(({ label }) => label.toLowerCase() === 'forum')

    return forumItem?.link || dafaultForumURL
  }

  return dafaultForumURL
}
