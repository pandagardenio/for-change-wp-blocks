import { useSelect } from "@wordpress/data";

export const useTitle = () => useSelect(select => typeof select("core/editor").getPostEdits().title !== 'undefined' ?
        select("core/editor").getPostEdits().title :
        select("core/editor").getCurrentPost().title
);