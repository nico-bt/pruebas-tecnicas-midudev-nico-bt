import { useState } from "react"
import { useUserContext } from "../context/userContext"
import BookDetailsDialog from "./BookDetailsDialog"

export default function BookList({ filteredBooks }) {
  const { userList, addBook } = useUserContext()
  const [openBookDetailsDialog, setOpenBookDetailsDialog] = useState({ open: false, book: {} })

  function handleClickAddToList(item) {
    addBook(item)
  }
  return (
    <>
      <section>
        <ul className="booklist-container">
          {filteredBooks?.map((item) => {
            const isItemInUserList = userList.some((bk) => bk.ISBN === item.ISBN)
            if (isItemInUserList) {
              return null
            } else {
              return (
                <li key={item.ISBN}>
                  <img src={item.cover} alt={`${item.title} cover`} />
                  <div className="booklist-btns">
                    <button onClick={() => handleClickAddToList(item)}>Add to List</button>
                    <button onClick={() => setOpenBookDetailsDialog({ open: true, book: item })}>
                      Details
                    </button>
                  </div>
                </li>
              )
            }
          })}
        </ul>
      </section>

      <BookDetailsDialog
        open={openBookDetailsDialog.open || false}
        setOpen={setOpenBookDetailsDialog}
        book={openBookDetailsDialog.book}
        handleClickAddToList={handleClickAddToList}
      />
    </>
  )
}
