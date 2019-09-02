namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class pricelistVersion : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Pricelists", "Version", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Pricelists", "Version");
        }
    }
}
