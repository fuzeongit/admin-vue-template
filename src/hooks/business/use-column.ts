import { computed, ref, watchEffect } from 'vue';
import type { TableBaseColumn, TableColumn, TableColumnGroup } from 'naive-ui/lib/data-table/src/interface';

type CustomAttribute = {
  visible?: boolean;
  permissions?: boolean;
  disabledVisible?: boolean;
};

type CustomTableColumn<T> = TableColumn<T> & CustomAttribute;

type CustomBaseColumn<T> = (TableColumnGroup<T> | TableBaseColumn<T>) & CustomAttribute;

export function useColumn<T>(customTableColumnsBuilder: () => CustomTableColumn<T>[]) {
  const customTableColumns = computed(customTableColumnsBuilder);

  const powerColumns = computed(() =>
    customTableColumns.value.filter(column => (column.permissions !== undefined ? column.permissions : true))
  );

  const visibleColumns = computed(
    () =>
      powerColumns.value
        .filter(column => 'key' in column && 'title' in column)
        .map(column => ({
          ...column,
          visible: column.visible !== undefined ? column.visible : true,
          permissions: column.permissions !== undefined ? column.permissions : true,
          disabledVisible: column.disabledVisible !== undefined ? column.disabledVisible : false
        })) as CustomBaseColumn<T>[]
  );

  const sortColumns = ref<CustomBaseColumn<T>[]>([]);

  const columns = computed(() =>
    sortColumns.value
      .filter(column => column.visible)
      .map(column => visibleColumns.value.find(c => c.key === column.key)!)
  );

  watchEffect(() => {
    if (sortColumns.value.length === 0) {
      sortColumns.value = visibleColumns.value;
    } else {
      // if (sortColumns.value.length >= visibleColumns.value.length) {
      //   sortColumns.value = sortColumns.value.map(column => visibleColumns.value.find(c => c.key === column.key)!);
      // } else {
      //   sortColumns.value = sortColumns.value.map(column => ({
      //     ...visibleColumns.value.find(c => c.key === column.key)!,
      //     visible: column.visible
      //   }));
      // }
      sortColumns.value = sortColumns.value.map(column => ({
        ...visibleColumns.value.find(c => c.key === column.key)!,
        visible: column.visible
      }));
    }
  });

  return {
    visibleColumns,
    sortColumns,
    columns
  };
}
