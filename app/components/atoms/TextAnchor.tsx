import { createStyles, Text } from "@mantine/core";

const useStyles = createStyles(() => ({
	linkText: {
		color: "#F09821",
    '&:link': {
      textDecoration: 'none'
    },
    '&:visited': {
      textDecoration: 'none'
    },
    '&:active': {
      textDecoration: 'none'
    },
    '&:hover': {
      textDecoration: 'none',
      color: '#c27c1c'
    },
	},
}));

const TextAnchor = ({
	text,
	linkText,
	weight = 500,
	to = "#",
}: {
	text: string;
	linkText: string;
	weight?: number;
	to: string;
}) => {
	const { classes } = useStyles();
	return (
		<Text weight={weight}>
			{text}{" "}
			<a className={classes.linkText} href={to}>
				{linkText}
			</a>
		</Text>
	);
};

export { TextAnchor };