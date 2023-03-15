import React from "react";

const useMount = (opened: boolean, animationTime: number = 300) => {
	const [mounted, setMounted] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (opened && !mounted) {
			setMounted(true);
		} else if (!opened && mounted) {
			setTimeout(() => {
				setMounted(false);
			}, animationTime);
		}
	}, [opened]);

	return {
		mounted,
	};
};

export default useMount;
