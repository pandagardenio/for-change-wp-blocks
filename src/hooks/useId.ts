import { useSelect } from "@wordpress/data";

export const useId = () => useSelect(select => select("core/editor").getCurrentPostId());