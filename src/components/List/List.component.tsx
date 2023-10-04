import type { Key } from "react";
import { Children } from "react";
import type { ListProps } from "./List.definition";
import { Item, Header, Container } from "./List.style";

const List = <T,>(props: ListProps<T>): JSX.Element => {
  const { header, dataSource, renderItem, children, rowKey, hasKeyLine, footer, ...rest } = props;

  const listItemsKeys: { [index: number]: Key } = {};

  const renderInnerItem = (item: T, index: number) => {
    if (!renderItem) return null;

    let key;

    if (typeof rowKey === "function") {
      key = rowKey(item);
    } else if (rowKey) {
      key = item[rowKey];
    } else {
      key = item.toString();
    }

    listItemsKeys[index] = key as Key;

    return renderItem(item, index);
  };

  const items = (dataSource || []).map((item, index) => renderInnerItem(item, index));
  const childrenList = Children.map(items, (child, index) => (
    <Item hasKeyLine={hasKeyLine} key={listItemsKeys[index]}>
      {child}
    </Item>
  ));

  return (
    <Container {...rest}>
      {header && <Header>{header}</Header>}
      {childrenList}
      {children}
      {footer && <div>{footer}</div>}
    </Container>
  );
};

export { List };
