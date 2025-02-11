import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import {Input} from "@/components/ui/input";

export default function SearchForm({ query }: { query?: string }) {
  return (
    <Form action="/" scroll={false}
      className="searchForm grow z-0 relative">
      <Input type="text" name="query" defaultValue={query}
        className="px-3 w-full rounded-none text-gray-900" placeholder="Search..."/>
      <div className="flex items-center gap-1 text-md sm:gap-4 absolute right-0 bottom-0 top-0">
        {query && <SearchFormReset />}
        <Button variant="secondary" className="rounded-none hover:bg-gray-300" type="submit">
          <SearchIcon  />
        </Button>
      </div>
    </Form>
  );
}
