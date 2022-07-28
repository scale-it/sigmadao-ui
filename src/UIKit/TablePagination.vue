<template>
	<a-pagination
		:hideOnSinglePage="true"
		v-model:current="currentPages"
		:pageSize="ROWS_PER_PAGE"
		:total="totalDataRowsCount"
	>
		<template #itemRender="{ type, originalElement }">
			<a
				v-if="type === 'prev'"
				@click="paginationHandler(PaginationCallType.NAV_PREV)"
				><left-outlined
			/></a>
			<a
				v-else-if="type === 'next'"
				@click="paginationHandler(PaginationCallType.NAV_NEXT)"
				><right-outlined
			/></a>
			<component
				@click="
					paginationHandler(
						PaginationCallType.JUMP_PAGE,
						originalElement.children[0].children
					)
				"
				:is="originalElement"
				v-else
			></component>
		</template>
	</a-pagination>
</template>

<script lang="ts">
import { ROWS_PER_PAGE } from "@/constants";
import { PaginationCallType } from "@/types";
import { defineComponent, ref } from "vue";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";

export default defineComponent({
	name: "TablePagination",
	props: ["totalDataRowsCount", "currentPage", "paginationHandler"],
	components: {
		LeftOutlined,
		RightOutlined,
	},
	data() {
		return {
			ROWS_PER_PAGE,
			PaginationCallType,
			currentPages: ref(1),
		};
	},
});
</script>
