import { ReactNode, useContext, useEffect, useState } from "react"
import { Pagination } from "react-bootstrap"

import { ListContext } from "@contexts/ListContext"
import { RoutesContext } from "@contexts/RoutesContext"

export default function PaginationItem({ routeKey }: { routeKey: string }) {
  const [items, setItems] = useState<ReactNode[]>([])

  const { maxPages, handlePagination } = useContext(ListContext)
  const { activePage } = useContext(RoutesContext)

  function buildItemsList() {
    let itemList = []
    if (maxPages > 5) {
      const startPage = activePage - 3 > 0 ? activePage - 3 : activePage
      const lastPage = maxPages - activePage > 3 ? activePage + 3 : activePage

      itemList.push(<Pagination.First key="1" onClick={handlePagination} />)
      for (let number = startPage; number <= lastPage; number++) {
        itemList.push(
          <Pagination.Item
            key={number}
            onClick={handlePagination}
            active={number === activePage}
            className="nav-link"
            href={`/${routeKey}/?page=${number}`}
          >
            {number}
          </Pagination.Item>
        )
      }
      itemList.push(
        <Pagination.Last key={maxPages} onClick={handlePagination} />
      )
    } else {
      for (let number = 1; number <= maxPages; number++) {
        itemList.push(
          <Pagination.Item
            key={number}
            onClick={handlePagination}
            active={number === activePage}
            href={`/${routeKey}/?page=${number}`}
          >
            {number}
          </Pagination.Item>
        )
      }
    }
    setItems(itemList)
  }

  useEffect(() => {
    buildItemsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPages])

  return (
    <div>
      <Pagination>{items}</Pagination>
      <br />
    </div>
  )
}
