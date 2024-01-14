// list.tsx
import styled from "@emotion/styled";
import React, { FC, RefObject, useEffect, useState } from "react";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 500px;
  overflow: auto;
`;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

interface ListProps {
  items: string[];
  listRef: RefObject<HTMLDivElement>; // Change from HTMLUListElement to HTMLDivElement
}

export const List: FC<ListProps> = ({ items, listRef }) => {
  const [lastVisibleIndex, setLastVisibleIndex] = useState(0);

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, clientHeight } = listRef.current;
      const firstVisibleIndex = Math.floor(scrollTop / 30);
      const visibleItemsCount = Math.ceil(clientHeight / 30);

      if (firstVisibleIndex !== lastVisibleIndex) {
        setLastVisibleIndex(firstVisibleIndex);
      }
    }
  };

  useEffect(() => {
    const updateScrollPosition = () => {
      handleScroll();
    };

    listRef.current?.addEventListener("scroll", updateScrollPosition);

    return () => {
      listRef.current?.removeEventListener("scroll", updateScrollPosition);
    };
  }, [listRef, lastVisibleIndex]);

  return (
    <ScrollWrapper onScroll={handleScroll} ref={listRef}>
      <ListWrapper>
        <SafelyRenderChildren>
          {items
            .slice(lastVisibleIndex, lastVisibleIndex + 500)
            .map((word) => (
              <Item key={word}>{word}</Item>
            ))}
        </SafelyRenderChildren>
      </ListWrapper>
    </ScrollWrapper>
  );
};
