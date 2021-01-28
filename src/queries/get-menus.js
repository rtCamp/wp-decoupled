import { gql } from '@apollo/client';
import MenuFragment from './fragments/menus';

export default gql`
    query GET_MENUS {
        headerMenus: menuItems(where: { location: PRIMARY, parentId: "0" }) {
            nodes {
                ...MenuFragment
                childItems {
                    nodes {
                        ...MenuFragment
                    }
                }
            }
        }
        footerMenus: menuItems(where: { location: SECONDARY, parentId: "0" }) {
            nodes {
                ...MenuFragment
                childItems {
                    nodes {
                        ...MenuFragment
                    }
                }
            }
        }
    }
    ${MenuFragment}
`;
